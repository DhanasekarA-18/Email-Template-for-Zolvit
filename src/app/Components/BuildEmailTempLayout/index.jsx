"use client";

import { useEffect, useState } from "react";
import Body from "../Body";
import Footer from "../Footer";
import Header from "../Header";
import DisplayOutput from "../DisplayOutput";
import useEmailTemplateData from "@/app/Components/Hooks/useEmailTemplateData";
import InsertButton from "../InsertButton";
import Loader from "../Loader";
import InputComponent from "../InputComponent";

const BuildEmailTempLayout = () => {
  const [bodyData, setBodyData] = useState("Dear Customer");
  const [addCtaCode, setAddCtaCode] = useState(false);
  const [ctaLabel, setCtaLabel] = useState("Upload Document");
  const [addCtaLink, setAddCtaLink] = useState("");
  const [addRegards, setAddRegards] = useState(true);
  const [loading, setLoading] = useState(true);

  // use custom hook
  const {
    headerData,
    footerData,
    setHeaderData,
    setFooterData,
    finalEmailTemplate,
  } = useEmailTemplateData({
    bodyData,
    ctaLabel,
    addCtaCode,
    addRegards,
    addCtaLink,
  });

  const handleResetData = () => {
    const res = confirm("Are you sure you want to reset body content?");
    if (Boolean(res)) {
      setBodyData("");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <main className="h-[100%] bg-[yellow]">
          <section className="flex gap-3 p-2">
            <section className="flex-[2] h-[100dvh] p-2">
              <h1>Add your header Code</h1>
              <Header
                value={headerData}
                onChange={(event) => {
                  setHeaderData(event.target.value);
                }}
                placeholder="Add header"
                rows={7}
              />
              <h1>Add your Footer Code</h1>
              <Footer
                value={footerData}
                onChange={(event) => {
                  setFooterData(event.target.value);
                }}
                placeholder="Add footer"
                rows={7}
              />

              <InsertButton
                name="addGreetings"
                checked={addRegards}
                onChange={setAddRegards}
                label="Add Regards"
              />

              <InsertButton
                name="addCtaBottom"
                checked={addCtaCode}
                onChange={setAddCtaCode}
                label="Add CTA Bottom"
              />

              {addCtaCode ? (
                <div>
                  <InputComponent
                    label={"Enter CTA Placeholder*"}
                    value={ctaLabel}
                    onChange={setCtaLabel}
                  />
                  <br />
                  <InputComponent
                    label={"Enter CTA LINK*"}
                    value={addCtaLink}
                    onChange={setAddCtaLink}
                  />
                </div>
              ) : null}
            </section>
            <section className="flex-[2] bg-[pink] p-2">
              <div className="flex justify-between items-center">
                <h1>Add your body Code</h1>
                <button
                  onClick={handleResetData}
                  className="bg-red-800 text-center p-3 rounded m-2"
                >
                  Reset Data
                </button>
              </div>
              <Body editorData={bodyData} setEditorData={setBodyData} />
            </section>

            <section className="flex-[3] bg-[green] p-2">
              <h1>Email Template Output</h1>
              <DisplayOutput result={finalEmailTemplate} />
            </section>
          </section>
        </main>
      )}
    </>
  );
};

export default BuildEmailTempLayout;

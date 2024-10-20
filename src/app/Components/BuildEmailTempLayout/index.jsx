"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import Body from "../Body";
import Footer from "../Footer";
import Header from "../Header";
import DisplayOutput from "../DisplayOutput";
import useEmailTemplateData from "@/app/Components/Hooks/useEmailTemplateData";
import InsertButton from "../InsertButton";
import Loader from "../Loader";
import InputComponent from "../InputComponent";

import emailTemplateImage from "../../public/email.webp";

const BuildEmailTempLayout = () => {
  const [bodyData, setBodyData] = useState("Dear Customer");
  const [addCtaCode, setAddCtaCode] = useState(false);
  const [ctaLabel, setCtaLabel] = useState("Upload Document");
  const [addCtaLink, setAddCtaLink] = useState("");
  const [addRegards, setAddRegards] = useState(true);
  const [loading, setLoading] = useState(true);

  // State to manage header and footer visibility
  const [headerVisible, setHeaderVisible] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

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
    }, 300);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <main className="bg-[#F8F8F8] h-[100dvh] flex flex-col">
          <section className="flex gap-4 p-4">
            <section className="flex-[2]  p-4 bg-white rounded-lg shadow-lg">
              <p className="text-[18px] leading-[20px] font-semibold text-[#001e39] pb-2">
                Customize your code🧑‍💻🗡️
              </p>
              <InsertButton
                name="headerToggle"
                checked={headerVisible}
                onChange={setHeaderVisible}
                label="Edit Header"
              />
              {headerVisible && (
                <Header
                  value={headerData}
                  onChange={(event) => {
                    setHeaderData(event.target.value);
                  }}
                  placeholder="Edit Header"
                  rows={7}
                />
              )}

              <InsertButton
                name="footerToggle"
                checked={footerVisible}
                onChange={setFooterVisible}
                label="Show Footer"
              />
              {footerVisible && (
                <Footer
                  value={footerData}
                  onChange={(event) => {
                    setFooterData(event.target.value);
                  }}
                  placeholder="Add footer"
                  rows={7}
                />
              )}

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

              {addCtaCode && (
                <div>
                  <InputComponent
                    label={"Enter CTA Placeholder*"}
                    value={ctaLabel}
                    onChange={setCtaLabel}
                    placeholder={"Enter CTA Placeholder"}
                  />
                  <br />
                  <InputComponent
                    label={"Enter CTA Link Name*"}
                    value={addCtaLink}
                    onChange={setAddCtaLink}
                    placeholder={"Enter Link Variable Name"}
                  />
                </div>
              )}

              <Image
                width={600}
                height={300}
                alt="email-template"
                className="p-2"
                src={emailTemplateImage}
              />
            </section>

            <section className="flex-[2] p-4 bg-[#f0f4ff] rounded-lg shadow-lg">
              <div className="flex justify-between items-center pb-[10px]">
                <h1 className="text-xl font-semibold">Add Your Body Code</h1>
                <button
                  onClick={handleResetData}
                  className="bg-red-600 text-white font-semibold p-2 rounded shadow hover:bg-red-700 transition duration-300"
                >
                  Reset Data
                </button>
              </div>
              <Body editorData={bodyData} setEditorData={setBodyData} />
            </section>

            <section className="flex-[3] p-4 bg-[#e3ffe6] rounded-lg shadow-lg">
              <h1 className="text-xl font-semibold">Email Template Output</h1>
              <DisplayOutput result={finalEmailTemplate} />
            </section>
          </section>
        </main>
      )}
    </>
  );
};

export default BuildEmailTempLayout;

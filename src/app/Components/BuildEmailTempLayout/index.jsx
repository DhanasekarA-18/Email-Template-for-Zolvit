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


import s from "./BuildEmailTempLayout.module.css";

const BuildEmailTempLayout = () => {
  const [bodyData, setBodyData] = useState("Dear Customer");
  const [addCtaCode, setAddCtaCode] = useState(false);
  const [ctaLabel, setCtaLabel] = useState("Upload Document");
  const [addCtaLink, setAddCtaLink] = useState("");
  const [addRegards, setAddRegards] = useState(true);
  const [loading, setLoading] = useState(true);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

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
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className={s.root}>
          {/* ── Top Bar ── */}
          <header className={s.topbar}>
            <div className={s.topbarBrand}>
              <div className={s.topbarIcon}>✉️</div>
              <div>
                <div className={s.topbarTitle}>Email Template Builder</div>
                <div className={s.topbarSubtitle}>Zolvit · Internal Tool</div>
              </div>
            </div>
            <span className={s.badge}>⚡ Live Preview</span>
          </header>

          {/* ── Three-column grid ── */}
          <div className={s.grid}>

            {/* ── Col 1 · Settings ── */}
            <aside className={s.panel}>
              <div className={s.panelHeader}>
                <div className={`${s.panelHeaderIcon} ${s.violet}`}>⚙️</div>
                <div>
                  <div className={s.panelTitle}>Settings</div>
                  <div className={s.panelDesc}>Configure template options</div>
                </div>
              </div>
              <div className={s.panelBody}>

                <div className={s.sectionLabel}>Sections</div>

                <InsertButton
                  name="headerToggle"
                  checked={headerVisible}
                  onChange={setHeaderVisible}
                  label="Edit Header"
                  icon="🗂️"
                />
                {headerVisible && (
                  <div className={s.expandBox}>
                    <Header
                      value={headerData}
                      onChange={(e) => setHeaderData(e.target.value)}
                      placeholder="Edit Header"
                      rows={5}
                    />
                  </div>
                )}

                <InsertButton
                  name="footerToggle"
                  checked={footerVisible}
                  onChange={setFooterVisible}
                  label="Edit Footer"
                  icon="📑"
                />
                {footerVisible && (
                  <div className={s.expandBox}>
                    <Footer
                      value={footerData}
                      onChange={(e) => setFooterData(e.target.value)}
                      placeholder="Add footer"
                      rows={5}
                    />
                  </div>
                )}

                <hr className={s.divider} />
                <div className={s.sectionLabel}>Content Options</div>

                <InsertButton
                  name="addGreetings"
                  checked={addRegards}
                  onChange={setAddRegards}
                  label="Add Regards"
                  icon="🤝"
                />

                <InsertButton
                  name="addCtaBottom"
                  checked={addCtaCode}
                  onChange={setAddCtaCode}
                  label="Add CTA Button"
                  icon="🔗"
                />

                {addCtaCode && (
                  <div className={s.expandBox}>
                    <div className={s.ctaWrapper}>
                      <InputComponent
                        label="CTA Placeholder *"
                        value={ctaLabel}
                        onChange={setCtaLabel}
                        placeholder="e.g. Upload Document"
                      />
                      <InputComponent
                        label="CTA Link Variable *"
                        value={addCtaLink}
                        onChange={setAddCtaLink}
                        placeholder="e.g. {{document_link}}"
                      />
                    </div>
                  </div>
                )}

                {/* Dev Info Card */}
                <div className={s.infoCard}>
                  <div className={s.infoCardTitle}>💡 Developer Tips</div>
                  <ul className={s.infoList}>
                    <li className={s.infoItem}>
                      <span className={s.infoTag}>CTA Link</span>
                      Use <code className={s.infoCode}>{"{{variable_name}}"}</code> format for dynamic links
                    </li>
                    <li className={s.infoItem}>
                      <span className={s.infoTag}>Regards</span>
                      Toggle adds <code className={s.infoCode}>Thanks &amp; Regards</code> block at the bottom
                    </li>
                    <li className={s.infoItem}>
                      <span className={s.infoTag}>Header</span>
                      Paste raw HTML for a custom banner or logo row
                    </li>
                    <li className={s.infoItem}>
                      <span className={s.infoTag}>Export</span>
                      Use <em>Copy Code</em> or <em>Download .html</em> from the output panel
                    </li>
                    <li className={s.infoItem}>
                      <span className={s.infoTag}>Test</span>
                      Enter any email and hit <em>Send</em> to preview in a real inbox
                    </li>
                  </ul>
                </div>

              </div>
            </aside>

            {/* ── Col 2 · Body Editor ── */}
            <section className={s.panel}>
              <div className={s.panelHeader}>
                <div className={`${s.panelHeaderIcon} ${s.blue}`}>✍️</div>
                <div className={s.bodyPanelHeader}>
                  <div>
                    <div className={s.panelTitle}>Body Content</div>
                    <div className={s.panelDesc}>Compose your email body</div>
                  </div>
                  <button className={s.resetBtn} onClick={handleResetData}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13"
                      viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="1 4 1 10 7 10" />
                      <path d="M3.51 15a9 9 0 1 0 .49-3.67" />
                    </svg>
                    Reset
                  </button>
                </div>
              </div>
              <div className={s.panelBody}>
                <Body editorData={bodyData} setEditorData={setBodyData} />
              </div>
            </section>

            {/* ── Col 3 · Output ── */}
            <section className={s.panel}>
              <div className={s.panelHeader}>
                <div className={`${s.panelHeaderIcon} ${s.emerald}`}>📤</div>
                <div>
                  <div className={s.panelTitle}>Template Output</div>
                  <div className={s.panelDesc}>Preview &amp; export your template</div>
                </div>
              </div>
              <div className={s.panelBody}>
                <DisplayOutput result={finalEmailTemplate} />
              </div>
            </section>

          </div>
        </div>
      )}
    </>
  );
};

export default BuildEmailTempLayout;

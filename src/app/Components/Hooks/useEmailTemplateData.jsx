import { useEffect, useState } from "react";
import { header } from "../data/header";
import { footer } from "../data/footer";

const useEmailTemplateData = ({
  bodyData,
  ctaLabel,
  addCtaCode = false,
  addRegards = false,
  addCtaLink = "",
}) => {
  //prefill header with current version
  const headerVersion = "v1";
  const footerVersion = "v1";

  const [headerData, setHeaderData] = useState(header?.[headerVersion]);
  const [footerData, setFooterData] = useState(footer?.[footerVersion]);

  const AddCta = `<tr>
                    <td style="padding: 12px 0px">
                      <a
                        style="
                          display: block;
                          color: #231f20;
                          font-size: 14px;
                          font-weight: 700;
                          background: #fdd106;
                          text-decoration: none;
                          width: 212px;
                          text-align: center;
                          border-top: 9px solid #fdd106;
                          border-bottom: 9px solid #fdd106;
                          border-radius: 6px;
                          cursor: pointer;
                          max-width: 212px;
                          margin: auto;
                        "
                        href="{{${addCtaLink}}}"
                        target="_blank"
                        >${ctaLabel}</a
                      >
                    </td>
                  </tr>`;

  const AddRegards = `<tr>
                    <td style="padding-top: 20px">
                      <h4
                        style="
                          color: #171717;
                          line-height: 24px;
                          font-size: 16px;
                          font-weight: 600;
                          margin: 0;
                        "
                      >
                        Best regards,<br />
                        Team Zolvit
                      </h4>
                    </td>
                  </tr>`;

  const finalEmailTemplate = `<html>
        <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       </head>

      <body
        style="
      margin: 0;
      font-family: Roboto, sans-serif;
      -webkit-font-smoothing: antialiased;
    "
      >
        <table
          align="center"
          style="width: 100%; border-collapse: collapse; background-color: #f9f9f9"
        >
          <tr>
            <td>
              <table
                align="center"
                style="
              border-collapse: collapse;
              max-width: 640px;
              margin: 40px auto;
            "
              >
                ${headerData}
                <tr>
                  <td
                    style="
                  background-color: #ffffff;
                  width: 100%;
                  height: 100%;
                  vertical-align: top;
                "
                  >
                    <table style="width: 100%; padding: 20px;">
                      <tr>
                        <td>${bodyData}</td>
                      </tr>
                      ${addCtaCode ? AddCta : ""}
                      ${addRegards ? AddRegards : ""}
                    </table>
                  </td>
                </tr>
                ${footerData}
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>`;

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "Are you sure you want to leave?";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return {
    headerData,
    footerData,
    setHeaderData,
    setFooterData,
    finalEmailTemplate,
  };
};
export default useEmailTemplateData;

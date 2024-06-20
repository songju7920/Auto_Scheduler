import { config } from "dotenv";
import { Client } from "@notionhq/client";
import cron from "node-cron";

config();

const notion = new Client({ auth: process.env.NOTION_KEY });
const databaseId = process.env.NOTION_PAGE_ID;

const getDate = () => {
  const now = new Date();
  return `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, 0)}/${now.getDate()}`;
};

const blank = (count) => {
  return Array(count).fill({
    object: "block",
    paragraph: {
      rich_text: [{ text: { content: "" } }]
    }
  });
};

const addItem = async () => {
  const response = await notion.pages.create({
    parent: { database_id: databaseId },
    properties: {
      title: {
        title: [
          {
            text: {
              content: getDate()
            }
          }
        ]
      }
    },
    children: [
      {
        object: "block",
        callout: {
          rich_text: [
            {
              text: {
                content: `이 페이지는 auto_scheduler에 의해 ${getDate()}(KST)에 자동 생성성되었습니다.`
              },
              type: "text",
              annotations: {
                italic: true
              }
            }
          ]
        }
      },
      {
        object: "block",
        heading_3: {
          rich_text: [
            {
              text: {
                content: "✔️ To do"
              }
            }
          ],
          color: "gray_background"
        }
      },
      ...blank(1),
      {
        object: "block",
        to_do: {
          rich_text: [
            {
              text: {
                content: ""
              }
            }
          ],
          checked: false
        }
      },
      {
        object: "block",
        to_do: {
          rich_text: [
            {
              text: {
                content: ""
              }
            }
          ],
          checked: false
        }
      },
      ...blank(1),
      {
        object: "block",
        heading_3: {
          rich_text: [
            {
              text: {
                content: "📑  Note"
              }
            }
          ],
          color: "gray_background"
        }
      },
      {
        object: "block",
        heading_3: {
          rich_text: [
            {
              text: {
                content: "📚  TIL"
              }
            }
          ],
          color: "gray_background"
        }
      }
    ]
  });
};
S;

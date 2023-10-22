export {}

const declarativeNetRequest = chrome.declarativeNetRequest

declarativeNetRequest.updateSessionRules(
  {
    addRules: [
      {
        id: 1,
        priority: 1,
        action: {
          type: declarativeNetRequest.RuleActionType.MODIFY_HEADERS,
          responseHeaders: [
            {
              header: "x-frame-options",
              operation: declarativeNetRequest.HeaderOperation.REMOVE
            },
            {
              header: "content-security-policy",
              operation: declarativeNetRequest.HeaderOperation.REMOVE
            }
          ]
        },
        condition: {
          urlFilter: `*`,
          resourceTypes: [
            declarativeNetRequest.ResourceType.MAIN_FRAME,
            declarativeNetRequest.ResourceType.SUB_FRAME
          ]
        }
      }
    ]
  },
  () => {
    if (chrome.runtime.lastError) {
      console.log(chrome.runtime.lastError.message)
    }
  }
)

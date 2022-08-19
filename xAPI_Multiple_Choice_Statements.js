var lrs;

try {
    lrs = new TinCan.LRS(
        {
            endpoint: "https://hirad-lrs-testing.lrs.io/xapi/",
            username: "cacoro",
            password: "midawo",
            allowFail: false
        }
    );
}
catch (ex) {
    console.log("Failed to setup LRS object: ", ex);
    // TODO: do something with error, can't communicate with LRS
}

var statement = new TinCan.Statement(
    {
        actor: {
            name: prez.variable('actorName'),
            mbox: prez.variable('actorEmail')
        },
        verb: {
            id: "http://adlnet.gov/expapi/verbs/completed",
            display: {"en-US": "Correct" }
        },
        target: {
            id: "http://BkWGhyu8",
            definition: {
                name: { "en-US": "Sending Statements" }
            }
        },
        object: {
          id: "http://BkWGhyu8",
          objectType: "Activity",
          definition: {
            type: "http://adlnet.gov/expapi/activities/cmi.interaction",
            name: {
              und: ""
            },
            description: {
              und: "What is the second largest country (in size) in the world? This is a test question, the answer is Canada (65_5)"
            },
            interactionType: "choice",
            correctResponsesPattern: [
              "65_5"
            ],
            choices: [
              {
                id: "65_4",
                description: {
                  und: "USA"
                }
              },
              {
                id: "65_5",
                description: {
                  und: "Canada"
                }
              },
              {
                id: "65_6",
                description: {
                  und: "China"
                }
              },
              {
                id: "65_7",
                description: {
                  und: "Russia"
                }
              }
            ]
          }
      },
    }
);

lrs.saveStatement(
  statement,
  {
      callback: function (err, xhr) {
          if (err !== null) {
              if (xhr !== null) {
                  console.log("Failed to save statement: " + xhr.responseText + " (" + xhr.status + ")");
                  // TODO: do something with error, didn't save statement
                  return;
              }

              console.log("Failed to save statement: " + err);
              // TODO: do something with error, didn't save statement
              return;
          }

          console.log("Statement saved");
          // TOOO: do something with success (possibly ignore)
      }
  }
);



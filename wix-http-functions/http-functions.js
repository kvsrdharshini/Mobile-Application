import { ok, serverError, forbidden } from "wix-http-functions";
import wixData from "wix-data";
import { authentication } from "wix-members-backend";
import { contacts } from "wix-crm-backend";
import wixSecretsBackend from "wix-secrets-backend";
import { members } from "wix-members-backend";

//Retrieve Yoga Poses
export const get_Items = (request) => {
  const options = createResponseOptions();

  return wixData
    .query("Items")
    .find()
    .then((results) => handleSuccess(options, results.items))
    .catch((error) => handleError(options, error));
};
export const use_get_Items = (request) => get_Items(request);
export const options_get_Items = (request) => createResponseOptions();

// Login with Wix Credentials
export const post_Login = async (request) => {
  const options = createResponseOptions();

  // Validate the API key
  const apiKey = request.headers["x-api-key"];
  const apiKeyValidationResult = await validateApiKey(apiKey);
  if (apiKeyValidationResult) {
    return apiKeyValidationResult; // Return error response
  }

  return request.body.text().then((body) => {
    const { email, password } = JSON.parse(body);

    return authentication
      .login(email, password)
      .then((sessionToken) => {
        const response = {
          headers: {
            "Content-Type": "application/json",
          },
          body: {},
        };

        return contacts
          .queryContacts()
          .find({
            suppressAuth: true, // Allow access without authentication
          })
          .then((results) => {
            const memberDetails = results.items.find((member) => {
              return member.primaryInfo.email === email;
            });

            // console.log(results);

            response.body = {
              token: sessionToken,
              details: memberDetails,
            };

            return ok(response);
          });
      })
      .catch((error) => {
        const response = {
          headers: {
            "Content-Type": "application/json",
          },
          body: error,
        };

        return forbidden(response);
      });
  });
};
export const use_post_Login = (request) => post_Login(request);
export const options_post_Login = (request) => createResponseOptions();

// Register as Wix Member
export const post_Register = async (request) => {
  const options = createResponseOptions();

  // Validate the API key
  const apiKey = request.headers["x-api-key"];
  const apiKeyValidationResult = await validateApiKey(apiKey);
  if (apiKeyValidationResult) {
    return apiKeyValidationResult; // Return error response
  }

  return request.body.text().then((body) => {
    const { email, password, username } = JSON.parse(body);

    const registrationOptions = {
      contactInfo: {
        firstName: username,
      },
      privacyStatus: "PUBLIC",
    };

    return authentication
      .register(email, password, registrationOptions)
      .then((registrationResult) => {
        return handleSuccess(options, {
          message: "Registration successful",
          result: registrationResult,
        });
      })
      .catch((error) =>
        handleError(options, "Registration failed: " + error.message)
      );
  });
};
export const use_post_Register = (request) => post_Register(request);
export const options_post_Register = (request) => createResponseOptions();

// Log Pose
export const post_LogPose = async (request) => {
  const options = createResponseOptions();

  // Validate the API key
  const apiKey = request.headers["x-api-key"];
  const apiKeyValidationResult = await validateApiKey(apiKey);
  if (apiKeyValidationResult) {
    return apiKeyValidationResult; // Return error response
  }

  return request.body.text().then((body) => {
    const { email, pose, id } = JSON.parse(body);

    const authOptions = {
      suppressAuth: true, // Allow access without authentication
    };

    // Check if the username exists in the "CompletedPoses" collection.
    wixData
      .query("CompletedPoses")
      .eq("email", email)
      .find()
      .then((results) => {
        // console.log(results);
        if (results.items.length === 0) {
          // If the username does not exist, create a new entry.
          const newEntry = {
            email: email,
            poses: [{ name: pose, timestamp: new Date(), id: id }],
          };
          wixData
            .insert("CompletedPoses", newEntry, authOptions)
            .then(() => {
              return handleSuccess(options, {
                message: "New entry created with pose.",
              });
            })
            .catch((error) => {
              return handleError(options, {
                message: "Error creating a new entry: " + error,
              });
            });
        } else {
          // If the username exists, update the existing entry.
          const existingEntry = results.items[0];
          existingEntry.poses.push({
            name: pose,
            timestamp: new Date(),
            id: id,
          });

          wixData
            .update("CompletedPoses", existingEntry, authOptions)
            .then(() => {
              return handleSuccess(options, {
                result: "Pose added to an existing entry.",
              });
            })
            .catch((error) => {
              return handleError(options, {
                message: "Error updating the existing entry: " + error,
              });
            });
        }
      })
      .catch((error) => {
        return handleError(options, {
          message: "Error querying the database: " + error,
        });
      });
    return ok();
  });
};
export const use_post_LogPose = (request) => post_LogPose(request);
export const options_post_LogPose = (request) => createResponseOptions();

// Returns a list of poses that a specified user has completed
export const post_CompletedPoses = async (request) => {
  const options = createResponseOptions();
  // Validate the API key
  const apiKey = request.headers["x-api-key"];
  const apiKeyValidationResult = await validateApiKey(apiKey);
  if (apiKeyValidationResult) {
    return apiKeyValidationResult; // Return error response
  }

  return request.body.text().then((body) => {
    const { email } = JSON.parse(body);
    return wixData
      .query("CompletedPoses")
      .eq("email", email)
      .find()
      .then((results) => {
        return handleSuccess(options, {
          completedPoses: results.items,
        });
      });
  });
};
export const use_post_CompletedPoses = (request) =>
  post_CompletedPoses(request);
export const options_post_CompletedPoses = (request) => createResponseOptions();

export const post_deleteUser = async (request) => {
  const options = createResponseOptions();

  // Validate the API key
  const apiKey = request.headers["x-api-key"];
  const apiKeyValidationResult = await validateApiKey(apiKey);
  if (apiKeyValidationResult) {
    return apiKeyValidationResult; // Return error response
  }

  return request.body.text().then((body) => {
    const { email } = JSON.parse(body);
    //We use the "Login" function to validate user deletion
    return use_post_Login(request).then((loginResults) => {
      const userDetails = loginResults.body.details.primaryInfo;
      console.log(userDetails);
      //This checks if the credentials provided can be used to login
      if (userDetails && userDetails.email && userDetails.email == email) {
        return use_post_CompletedPoses(request).then(
          (completedPosesResults) => {
            try {
              const id = completedPosesResults.body.completedPoses[0]._id;
              wixData.remove("CompletedPoses", id, { suppressAuth: true });
              return handleSuccess(options, { message: "Removed Yoga Data" });
            } catch (error) {
              return handleError(options, {
                message: "There are no poses saved.",
              });
            }
          }
        );
      } else {
        return handleError(options, { message: "Authentication failed" });
      }

      // //This code deletes a formally deletes a member
      // //However, regular members do not have delete permissions.
      // try {
      //   members.deleteMember(loginResults.body.details._id).then(() => {
      //    console.log("Hi")
      //    return handleSuccess(options, {
      //     message: "Deletion successful"
      //   });
      // })
      // } catch (error) {
      //   console.error(error)
      // }
    });
  });
};
export const use_post_deleteUser = (request) => post_deleteUser(request);
export const options_post_deleteUser = (request) => createResponseOptions();

// Function to update a specific email's column in CompletedPoses to true
export const post_prize = async (request) => {
  const options = createResponseOptions();

  const authOptions = {
    suppressAuth: true, // Allow access without authentication
  };

  // Validate the API key (if needed)
  const apiKey = request.headers["x-api-key"];
  const apiKeyValidationResult = await validateApiKey(apiKey);
  if (apiKeyValidationResult) {
    return apiKeyValidationResult; // Return error response
  }

  return request.body.text().then(async (body) => {
    const { email, prize } = JSON.parse(body);

    // Query the CompletedPoses collection to find the specific email
    const queryResult = await wixData
      .query("CompletedPoses")
      .eq("email", email)
      .find();

    if (queryResult.items.length === 0) {
      return handleError(options, "Email not found"); // Handle if email is not found
    }

    // Update the specified column to true for the found email
    const itemToUpdate = queryResult.items[0]; // Assuming there's only one matching email
    itemToUpdate[prize] = true;

    // Save the updated item
    await wixData.update("CompletedPoses", itemToUpdate, authOptions);
    return handleSuccess(options, "Column updated successfully");
  });
};
export const use_post_prize = (request) => post_prize(request);
export const options_post_prize = (request) => createResponseOptions();

/*
 *  HELPER FUNCTIONS:
 *  The code below provides reusable functions for the main code.
 */

// Validation - ensures that communcation orginates from the 100 days of Yoga App
const validateApiKey = async (apiKey) => {
  // Retrieve the API key stored in Wix Secrets
  const secret = await wixSecretsBackend.getSecret("100Days_API_Key");

  // Check if the API key matches the stored secret
  if (apiKey == null || apiKey !== secret) {
    return {
      headers: {
        "Content-Type": "application/json",
      },
      body: "Invalid API Key",
    };
  }

  return null; // API key is valid
};

const handleSuccess = (options, items) => {
  console.log(items);
  options.body = items;
  return ok(options);
};

const handleError = (options, error) => {
  console.error(error);
  options.body = { error: error };
  return serverError(options);
};

const createResponseOptions = () => ({
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST",
  },
});

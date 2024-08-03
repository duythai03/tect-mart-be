const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "../../.env" });

const generalAccessToken = (payload) => {
  console.log("payload", payload);
  const access_Token = jwt.sign(
    {
      payload,
    },
    process.env.ACCESS_TOKEN,
    { expiresIn: "1h" }
  );
  return access_Token;
};

const generalRefreshToken = (payload) => {
  console.log("payload", payload);
  const refresh_Token = jwt.sign(
    {
      payload,
    },
    process.env.REFRESH_TOKEN,
    { expiresIn: "365d" }
  );
  return refresh_Token;
};

module.exports = { generalAccessToken, generalRefreshToken };

import { GetSSMParameters } from "../ssm/index.js";

export const GetAction = async ({ profile }, name) => {
  profile = profile || Deno.env.get("AWS_PROFILE");

  const parameter = await GetSSMParameters(profile, name);
  const value = parameter?.Value;

  if (!value) {
    console.error(`Parameter '${name}' not found`);
    Deno.exit(1);
  }
  console.log(value);

  return value;
};

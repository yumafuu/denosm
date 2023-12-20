import { GetSSMParameters } from "../ssm/index.js";

export const GetAction = async ({ profile, name }) => {
  const parameter = await GetSSMParameters(profile, name);
  const value = parameter.Value;

  console.log(value);

  return value;
};

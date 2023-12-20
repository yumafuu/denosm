import { ListSSMParameters } from "../ssm/index.js";

export const ListAction = async ({ profile, query }) => {
  profile = profile || Deno.env.get("AWS_PROFILE");

  const list = await ListSSMParameters(profile);
  const parameters = list
    .Parameters
    .map((p) => p.Name)
    .filter((p) => query ? p.includes(query) : true)
    .join("\n");

  console.log(parameters);
  return parameters;
};


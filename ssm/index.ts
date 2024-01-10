import $ from "https://deno.land/x/dax/mod.ts";

export type Parameter = {
  Name: string;
  Type: string;
  LastModifiedDate: string;
  Version: number;
  Tier: string;
  DataType: string;
  Description?: string;
  Value: string;
};

export type List = {
  Parameters: Parameter[];
};

const types = ["String", "StringList", "SecureString"] as const;
export type ValueType = typeof types[number];

export const ListSSMParameters = async (profile: string): Promise<List> => {
  const list = await $`aws ssm describe-parameters --profile ${profile}`.json();

  return list;
};

export const GetSSMParameters = async (
  profile: string,
  name: string,
): Promise<Parameter> => {
  const parameters =
    await $`aws ssm get-parameters --name ${name} --with-decryption --profile ${profile}`
      .json();

  const param = parameters.Parameters[0];

  return param;
};

export const PutSSMParameters = async (
  profile: string,
  name: string,
  value: string,
  type: "String" | "StringList" | "SecureString",
  overwrite: boolean,
): Promise<Parameter> => {

  const parameter = await $`aws ssm put-parameter --name ${name} --value ${value} --type ${type} ${overwrite ? "--overwrite" : ""} --profile ${profile}`.json()

  return parameter;
}

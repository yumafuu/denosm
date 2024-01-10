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

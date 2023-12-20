import $ from "dax";

export const ListSSMParameters = async (profile) => {
  const list = await $`aws ssm describe-parameters --profile ${profile}`.json();

  return list;
};

export const GetSSMParameters = async (profile, name) => {
  const parameters =
    await $`aws ssm get-parameters --name ${name} --with-decryption --profile ${profile}`
      .json();

  const param = parameters.Parameters[0];

  return param;
};

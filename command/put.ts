import {
  GetSSMParameters,
  ListSSMParameters,
  PutSSMParameters,
  ValueType,
} from "../ssm/index.ts";
import { Input } from "https://deno.land/x/cliffy@v1.0.0-rc.3/prompt/mod.ts";
import { Select } from "https://deno.land/x/cliffy@v1.0.0-rc.3/prompt/select.ts";
import { Confirm } from "https://deno.land/x/cliffy@v1.0.0-rc.3/prompt/confirm.ts";
import { Table } from "https://deno.land/x/cliffy@v1.0.0-rc.3/table/mod.ts";
import { colors } from "https://deno.land/x/cliffy@v1.0.0-rc.3/ansi/colors.ts";

export const PutAction = async ({
  profile,
  name,
  value,
  type,
  override,
}: {
  profile?: string;
  name?: string;
  value?: string;
  type?: string;
  override: boolean;
}) => {
  profile = profile || Deno.env.get("AWS_PROFILE");

  if (!profile) {
    console.log("No profile specified");
    return;
  }

  const suggestions = (await ListSSMParameters(profile))
    .Parameters
    .map((p) => p.Name);

  if (!name) {
    name = await Input.prompt({
      message: "name?",
      list: true,
      suggestions,
    });

    if (!name) {
      console.log("No name specified");
      return;
    }
  }

  if (!value) {
    value = await Input.prompt(`value?`);
    if (!value) {
      console.log("No value specified");
      return;
    }
  }

  if (!type) {
    type = await Select.prompt({
      message: "type?",
      options: ["String", "StringList", "SecureString"],
    });
    if (!type) {
      console.log("No type specified");
      return;
    }

    if (!["String", "StringList", "SecureString"].includes(type)) {
      console.log(
        "Invalid type specified, must be one of String, StringList, SecureString",
      );
      return;
    }
  }

  if (!override) {
    const hasParameter = !!(await GetSSMParameters(profile, name));
    if (hasParameter) {
      const isOverride = await Select.prompt({
        message: "override?",
        options: ["yes", "no"],
      });
      override = isOverride === "yes";
      if (!override) {
        console.log("Not overriding");
        return;
      }
    }
  }

  const info = colors.bold.blue;
  const table: Table = new Table(
    ["name", info(name)],
    ["value", info(value)],
    ["type", info(type)],
    ["override", info(override ? "yes" : "no")],
  );

  console.log(table.toString());
  const confirmed: boolean = await Confirm.prompt("Can you confirm?");
  if (!confirmed) {
    console.log("Aborted");
    return;
  }

  const parameter = await PutSSMParameters(
    profile,
    name,
    value,
    type as ValueType,
    override,
  );

  console.log(JSON.stringify(parameter));
  return parameter;
};

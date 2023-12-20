import { Command } from "cliffy";
import { ListAction } from "./command/list.js";
import { GetAction } from "./command/get.js";
import { FuzzyFindAction } from "./command/fuzzy.js";

const VERSION = "1.0.0";
const DESCRIPTION = "AWS SSM Parameter Store CLI with deno";

await new Command()
  .name("sm")
  .version(VERSION)
  .description(DESCRIPTION)
  .globalOption("-p, --profile <profile:string>", "AWS profile name")
  .option("-q, --query <filter:string>", "Filter query")
  .default("fuzzy")
  // list
  .command("list", "List parameters")
  .action(ListAction)
  // get
  .command("get", "Get parameter")
  .option("-n, --name <name:string>", "Parameter name", { required: true })
  .action(GetAction)
  // fuzzy find
  .command("fuzzy", "Fuzzy find parameter")
  .action(FuzzyFindAction)
  .parse(Deno.args);

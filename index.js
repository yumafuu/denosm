import { Command } from "https://deno.land/x/cliffy@v1.0.0-rc.3/command/mod.ts";
import { ListAction } from "./command/list.js";
import { GetAction } from "./command/get.js";
import { FuzzyFindAction } from "./command/fuzzy.js";

const VERSION = "0.2.0";
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
  .arguments("<name>")
  .action(GetAction)
  // fuzzy find
  .command("fuzzy", "Fuzzy find parameter")
  .action(FuzzyFindAction)
  .parse(Deno.args);

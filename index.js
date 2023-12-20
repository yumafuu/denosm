import { Command } from "cliffy";
import { FuzzyFindAction, GetAction, ListAction } from "./command/index.js";

const VERSION = "1.0.0";
const DESCRIPTION = "AWS SSM Parameter Store CLI with deno";

await new Command()
  .name("ssmhmm")
  .version(VERSION)
  .description(DESCRIPTION)
  .globalOption("-p, --profile <profile:string>", "AWS profile name")
  .default("fuzzy")
  // list
  .command("list", "List parameters")
  .option("-q, --query <filter:string>", "Filter query")
  .action(ListAction)
  // get
  .command("get", "Get parameter")
  .option("-n, --name <name:string>", "Parameter name", { required: true })
  .action(GetAction)
  // fuzzy find
  .command("fuzzy", "Fuzzy find parameter")
  .option("-q, --query <query:string>", "Filter query")
  .action(FuzzyFindAction)
  .parse(Deno.args);

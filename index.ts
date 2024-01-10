import { Command } from "https://deno.land/x/cliffy@v1.0.0-rc.3/command/mod.ts";
import { FuzzyFindAction, GetAction, ListAction, PutAction } from "./command/index.ts";

const VERSION = "0.2.0";
const DESCRIPTION = "AWS SSM Parameter Store CLI with deno";

await new Command()
  .name("sm")
  .version(VERSION)
  .description(DESCRIPTION)
  // global options
  .globalOption("-p, --profile <profile:string>", "AWS profile name")
  .option("-q, --query <filter:string>", "Filter query")

  // default
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

  // put
  .command("put", "Put parameter")
  .action(PutAction)
  .option("-n, --name <name:string>", "Parameter name")
  .option("-v, --value <value:string>", "Parameter value")
  .option("-t, --type <type:string>", "Parameter type (String, StringList, SecureString)")
  .option("-o, --override", "Override if existed")

  // parse
  .parse(Deno.args);

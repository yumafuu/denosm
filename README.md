# 🦖 denosm

Fuzzy Finder for
[AWS SSM Parameter Store](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html)

using [fzf-for-js](https://github.com/ajitid/fzf-for-js?tab=readme-ov-file)
which uses [fzf](https://github.com/junegunn/fzf)'s algorithm

## Usage

![usage](https://github.com/YumaFuu/denosm/assets/32477095/03f42c87-0307-4476-81c1-c27484ed29bf)


```bash
$ sm # fuzzy find
$ sm list # list all parameters
/path/to/secret_key
/path/to/username
/path/to/supersecretkey

$ sm get "/path/to/username" # get value by name
its-me

$ sm list -p your-aws-profile # set AWS_PROFILE
```

## Install

```bash
# Deno
$ deno install -A https://deno.land/x/denosm/index.js -n sm -f

# Homebrew
$ brew install YumaFuu/tap/sm
```

## Requirements

- [Deno](https://deno.com)
- [aws-cli](https://aws.amazon.com/cli/)

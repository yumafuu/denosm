# 🦖 denosm

![Release](https://github.com/YumaFuu/denosm/actions/workflows/release.yaml/badge.svg)

Fuzzy Finder for
[AWS SSM Parameter Store](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html)

using [fzf-for-js](https://github.com/ajitid/fzf-for-js?tab=readme-ov-file)
which uses [fzf](https://github.com/junegunn/fzf)'s algorithm

## Usage

![usage](https://github.com/YumaFuu/denosm/assets/32477095/03f42c87-0307-4476-81c1-c27484ed29bf)

```bash
# fuzzy find
$ sm

# list all parameters
$ sm list
/path/to/secret_key
/path/to/username
/path/to/supersecretkey

# get value by name
$ sm get "/path/to/username"
its-me

# set AWS_PROFILE
$ sm list -p your-aws-profile

# Create or Update value
$ sm put
# or
$ sm put -n name -v value -t String
```

## Install

```bash
# Deno
$ deno install -A https://deno.land/x/denosm/index.ts -n sm -f

# Homebrew
$ brew install YumaFuu/tap/sm
```

## Requirements

- [Deno](https://deno.com)
- [aws-cli](https://aws.amazon.com/cli/)

# 🦖 denosm

Fuzzy Finder for
[AWS SSM Parameter Store](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html)

using [fzf-for-js](https://github.com/ajitid/fzf-for-js?tab=readme-ov-file)
which uses [fzf](https://github.com/junegunn/fzf)'s algorithm

## Usage

![render1703128886381](https://github.com/YumaFuu/denosm/assets/32477095/4b0a25a6-8050-42c1-81f9-08a0b9efcaac)



```bash
$ sm # fuzzy find
$ sm list
/some-app/ahhhhh
/some-app/some-key
/some-app/supersecretkey

$ sm get -n "/path/to/ssm"
some-value

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

# Change helmfile service version

## Test localy
```
act workflow_dispatch -e test.event -w -p --rm --use-gitignore=false 
```

To rebuild:
```
yarn run package
```

## Dev dependecies
- nektos/act
# in-browser

Simple utility tool that injects a .json file ( or any text file ) into your default browser for you to work on.
Useful if you want to perform a quick search or other operations on a large json ( e.g. geojson) that might crash or freeze your browser if you simply paste it into the console.

## Install

```
npm install -g in-browser
```

##Usage

Opening the only .json file in the current directory doesn't require any arguments :

```
in-browser
```

If you have several .json files and want to open a specific one, pass it as the first argument :

```
in-browser myJson.json
```
# Remarque

A package to convert your markdown to a full blown web app

## Package

WIP

## CLI

### Commands

<img src = "./ScreenShots/CLICommands.png" alt = "CLI Commands">

#### `convert`

Alias `cnv`

##### Options

<img src = "./ScreenShots/ConvertOptions.png" alt = "Convert Options">

* `c`, `chapters`: Comma separated list of chapters to convert
* `o`, `output` : Directory where to dump all the converted files

##### Examples

<img src = "./ScreenShots/ConvertExamples.png" alt = "Convert Examples">

```shell
remarque convert -c               Converts all the chapters
remarque convert -c 1             Convert the chapter 1
remarque convert -c 1-5           Convert chapters 1-5
remarque convert -c 1-5,6         Convert chapters 1-5 and chapter 6
remarque convert -c 1-5,6-8       Convert chapters 1-5 and chapters 6-8
remarque convert -c 1 -o OUTPUTS  dumps chapter 1 to OUTPUTS directory
remarque convert -c -o OUTPUTS    dumps all the converted files to OUTPUTS
                                  directory
remarque convert -c -o            dumps all the converted files to OUTPUT
                                  directory
```

#### `stat`

WIP

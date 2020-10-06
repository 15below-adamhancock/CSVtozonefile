CSV to zone file converter

This script will convert a CSV file to a DNS zonefile. The DNS zonefile can be imported into cloudflare or any other supported provider.

`Zone         ,Record              ,Record Type ,TTL  ,Content
15below.com   ,test                ,A           ,3600,1.1.1.1`

## Requirements

- NodeJS

## Setup

- `npm install`

## Usage

- Copy the CSV file to input folder.
- `node .\convert.js filename.csv domain.com`

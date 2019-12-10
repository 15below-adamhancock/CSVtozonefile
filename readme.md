# Flexential CSV to zone file converter

This script will convert a CSV file exported from Flextential to a DNS zonefile. The DNS zonefile can be imported into cloudflare or any other supported provider.

## requirements

- NodeJS

## Setup

- `npm install`

## Usage

- Copy the flexential CSV file to input folder.
- `node .\convert.js filename.csv domain.com`

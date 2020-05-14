provider "aws" {
  profile    = "default"
  region     = "us-west-2"
}

resource "aws_dynamodb_table" "dogs" {
    name           = "dogs"
  read_capacity  = 5
  write_capacity = 5
  hash_key       = "dogId"

  attribute {
    name = "dogId"
    type = "S"
  }
}

resource "aws_s3_bucket" "dogbook-files" {
  bucket = "dogbook-files"
}
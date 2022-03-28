# VueJS + Webpack Frontend for Content API by Serverless

## Instration

#### Preparation

You need below

* nodeJS >= v14.15.X


## Setup GitHub Actions for deploying static site

### Set enviroment variables

* Access to https://github.com/{your-account}/{repository-name}/settings/secrets/actions
* Push "New repository secret"
* Add Below
    * Common
        * __AWS_ACCESS_KEY_ID__ : your-aws-access_key
        * __AWS_SECRET_ACCESS_KEY__ : your-aws-secret_key
    * For Production
        * __CLOUDFRONT_DISTRIBUTION__ : your cloudfront distribution created by terraform for production
        * __S3_CONFIG_BUCKET__: "frontend-configs/content-api-config-prd" for production
        * __S3_RESOURCE_BUCKET__: "your-domain-static-site.example.com" for production
    * For Develop
        * __CLOUDFRONT_DISTRIBUTION_DEV__ : your cloudfront distribution created by terraform for develop
        * __S3_CONFIG_BUCKET_DEV__: "frontend-configs/content-api-config-dev" for develop
        * __S3_RESOURCE_BUCKET_DEV__: "your-domain-static-site-dev.example.com" for develop

### Upload config file for frontend app

#### Edit config file
#### Basic config

```bash
cd (project_root_dir)
cp src/client/js/config/config.json.sample src/client/js/config/config.json
vi src/client/js/config/config.json
```

```json
{
  "domain": "your-api-domain.example.com",
  "port": null,
  "baseUrl": "/",
  "isSSL": true,
  "siteName": "Sample Site"
}
```

#### Upload S3 Bucket named "content-api-config-hoge"

#### Deploy continually on pushed to git

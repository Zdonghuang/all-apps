# leapai_app_map
A starter project for leapai.com platform applications, using Meteor &amp; Vue.

Please contribute by opening Issues and submitting PRs!

Clone the project and navigate into its directory. Then install the npm dependencies:

```
meteor npm i
```

## Debug
To start the app, use the usual `meteor` command.

[Lab]
MONGO_URL=mongodb://172.17.171.84:27017/meteor meteor
[Production]
MONGO_URL=mongodb://leapaidbuser:LANDesk1213@120.136.130.24:27017/meteor meteor
*Windows use SET

## Build
meteor build --architecture=os.linux.x86_64 ../output

## Run
docker run -d \
-e ROOT_URL=http://120.136.130.24 \
-e MONGO_URL=mongodb://leapaidbuser:LANDesk1213@120.136.130.24/meteor \
-e BUNDLE_URL=http://www.leapai.com/images/kabulb-<id>.tar.gz \
-p <port>:80 abernix/meteord:node-8.4.0-base\
import { StackContext, Auth as Authentication, use } from "@serverless-stack/resources";
import { PolicyStatement, Effect } from "aws-cdk-lib/aws-iam";
import API from "./api";
import Storage from "./storage";


export default function Auth({ stack, app }:StackContext) {

  const { bucket } = use(Storage);
  const api = use(API);

  const auth = new Authentication(stack, "Auth", {
    login: ["email","phone", "preferredUsername", "username"]
  });

  auth.attachPermissionsForAuthUsers(stack, [
    api,
    new PolicyStatement({
      actions: ["s3:*"],
      effect: Effect.ALLOW,
      resources: [
        bucket.bucketArn + "/private/${cognito-identity.amazonaws.com:sub}/*",
      ],
    })
  ]);

  stack.addOutputs({
    Region: app.region,
    UserPoolId: auth.userPoolId,
    IdentityPoolId: auth.cognitoIdentityPoolId!,
    UserPoolClientId: auth.userPoolClientId,
  });

}
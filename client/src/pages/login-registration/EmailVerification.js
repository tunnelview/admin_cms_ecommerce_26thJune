import React from "react";
import { MainLayout } from "../../layout/MainLayout";
import { useSearchParams } from "react-router-dom";

const EmailVerfication = () => {
  let [searchParams] = useSearchParams();
  const email = searchParams.get("e");
  const verficationCode = searchParams.get("c");

  return (
    <MainLayout>
      <h1>EmailVerfication to do</h1>
      {email} \\ {verficationCode}
    </MainLayout>
  );
};

export default EmailVerfication;

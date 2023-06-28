import { Spinner } from "@chakra-ui/react";

export default function Loading() {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "10%", marginBottom: "10%" }}>
      <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="green.500" size="xl" />
    </div>
  );
}

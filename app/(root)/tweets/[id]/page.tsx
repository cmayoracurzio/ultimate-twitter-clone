import Header from "@/components/header";

export default async function Page({ params }: { params: { id: string } }) {
  const tweetId = params.id;

  return (
    <>
      <Header>Tweet</Header>
      <p className="p-4 flex justify-center">Coming soon</p>
    </>
  );
}

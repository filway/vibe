interface Props {
  params: Promise<{
    projectId: string
  }>
}

const Page = async ({ params }: Props) => {
  const { projectId } = await params

  return (
    <div>
      <h1>Project Details</h1>
      <p>Project ID: {projectId}</p>
    </div>
  )
}

export default Page

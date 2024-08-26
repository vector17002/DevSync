import SessionForm from "@/components/main/create-session/session-form"

const CreateSession = async () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center mt-10">
        <div className="text-5xl font-bold">Create Session</div>
        <SessionForm />
    </div>
  )
}

export default CreateSession
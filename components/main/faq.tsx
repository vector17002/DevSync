import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  
  export function FAQ() {
    return (
        <div className="flex flex-col w-full h-full gap-10 justify-center items-center mt-10 mb-10" id="faq">
            <p className="font-semibold text-2xl md:text-5xl">Frequently Asked Questions</p>
      <Accordion type="single" collapsible className="w-full max-w-2xl">
      <AccordionItem value="item-1">
  <AccordionTrigger>Can I collaborate with developers from different regions using your product?</AccordionTrigger>
  <AccordionContent>
    Absolutely! Our product is designed to facilitate collaboration among developers across various regions. With features like low-latency audio and video, you can connect seamlessly with your team, no matter where they are located. Additionally, our platform encourages networking and connection-building, allowing you to grow your professional relationships while working on projects together.
  </AccordionContent>
</AccordionItem>
<AccordionItem value="item-2">
  <AccordionTrigger>Can I follow other users on the platform?</AccordionTrigger>
  <AccordionContent>
    Yes, you can easily follow other users on our platform! This feature allows you to stay connected with your peers and keep track of their activities and projects. By following others, you can foster collaboration and build a stronger network within the developer community.
  </AccordionContent>
</AccordionItem>
<AccordionItem value="item-3">
  <AccordionTrigger>How can following other users benefit my professional growth?</AccordionTrigger>
  <AccordionContent>
    Following other users allows you to learn from their experiences, gain insights into their projects, and discover new trends in the industry. By staying updated on their activities, you can identify opportunities for collaboration, mentorship, and networking, ultimately enhancing your professional growth and expanding your connections.
  </AccordionContent>
</AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>How does your product enhance video and audio meetings for developers compared to Discord and Google Meet?</AccordionTrigger>
          <AccordionContent>
          Our product is specifically designed for developers, offering features like low-latency audio and video, which are crucial for real-time collaboration. Unlike Discord, which is primarily a gaming platform, and Google Meet, which is more general-purpose, our tool focuses on providing a seamless experience tailored to coding and technical discussions.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>What makes your screen sharing capabilities superior to those of Google Meet and Discord?</AccordionTrigger>
          <AccordionContent>
          Our screen sharing feature allows for high-resolution sharing with minimal lag, ensuring that code and design elements are displayed clearly. Additionally, we offer 1080p resolution free of cost whereas you have to pay Discord for that, making it easier for developers to collaborate on projects without distractions.
          </AccordionContent>
        </AccordionItem>
        

      </Accordion>
      </div>
    )
  }
  
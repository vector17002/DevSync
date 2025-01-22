"use client"
import { useState, useRef, ReactNode } from "react";
import {
    KnockFeedProvider,
    KnockProvider,
    NotificationFeedPopover,
    NotificationIconButton,
  } from "@knocklabs/react";
  // Required CSS import, unless you're overriding the styling
  import "@knocklabs/react/dist/index.css";
import { initialProfile } from "./initial-profile";
  
export const NotificationProvider = async ( { children } : { children : ReactNode}) => {
    const [isVisible, setIsVisible] = useState(false);
    const notifButtonRef = useRef(null);
    const user = await initialProfile()
    //@ts-ignore
    const userId = user.id

    if(!userId)
        return <div>No user id</div>


    return (
      <KnockProvider apiKey={process.env.KNOCK_PUBLIC_API_KEY} userId={userId}>
        {/* Optionally, use the KnockFeedProvider to connect an in-app feed */}
        <KnockFeedProvider feedId={process.env.KNOCK_FEED_ID}>
          <div>
            <NotificationIconButton
              ref={notifButtonRef}
              onClick={(e) => setIsVisible(!isVisible)}
            />
            <NotificationFeedPopover
              buttonRef={notifButtonRef}
              isVisible={isVisible}
              onClose={() => setIsVisible(false)}
            />
            {children}
          </div>
        </KnockFeedProvider>
      </KnockProvider>
    );
  };
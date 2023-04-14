import * as amplitude from "@amplitude/analytics-browser";

type AmplitudeServiceProps = {
  eventName: string;
  properties?: { id: string; email: string; strategy: string };
};

// amplitude.init("6a520fb10bc66d49e9e84ef85c1a107a");
export const ampiltudeService = {
  track: (props: AmplitudeServiceProps) => {
    amplitude.track(props.eventName, props.properties);
  },
};

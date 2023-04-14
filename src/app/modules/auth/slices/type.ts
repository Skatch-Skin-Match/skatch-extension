export type AuthState = {
  firstName: string | null;
  token: string | null;
  lastName: string | null;
  // isLogin: boolean;
};
export type User = {
  id: string;
  email: string;
  strategy?: string;
  //   firstName: string;
  profilePicture: string;
};
export interface TimeZoneProps {
  id: number;
  saveClock: string;
  timeZoneValue: string;
}
export interface Config {
  presetColor: { id: number; colorCode: string; colorName: string; hsv: string[] }[];
  selectedColor: { id: number; colorCode: string; colorName: string; hsv: string[] };
  history: { id: number; colorName: string; hsv: string[]; imageName: string }[];
}
export type AuthInitialState = {
  userData: User;
  token: string;
  configData: Config;
  openNewTab: boolean;
  //   showDate: string;
  //   isLoggedIn: boolean;
  //   backgroundImage: string;
};
export interface TimeZoneClockType {
  id: number;
  saveClock: string;
  timeZoneValue: string;
  place: string;
}
// export type AuthApiResponse<T> = {
//   statusCode: number;
//   data: {
//     userData: User;
//     configData: Config;
//     token: T;
//   };
//   message: string;
// }
// export type AxiosResponse<T> = {
//   status?: number;
//   statusText?: string;
//   data: T;
// };
export type LoginApiRequest = { email: string; password: string };
export type SignUpApiRequest = {
  // firstName: string;
  // lastName: string;
  email: string;
  password: string;
};
export type LoginApiResponse = {
  statusCode: number;
  data: {
    userData: User;
    configData: Config;
    token: string;
  };
  message: string;
};
export interface UpdateApiRequest {
  // [key: string]: any;
  id: string;
  config?: Config;
  // firstName?: string;
}
export interface UpdateApiResponse {
  statusCode: number;
  message: string;
  data: {
    userData: User;
    configData: Config;
  };
}
export type UpdateConfigNoLoginResponse = {
  presetColor: { id: number; colorCode: string; colorName: string; hsv: string[] }[];
  selectedColor: any;
  history: never[];
};
export type IsOpenNewTab = {
  openNewTab: boolean;
};
export interface UpdateProfilePicResponse {
  message: string;
  profilePicture: string;
  statusCode: number;
}
export type PhotoApiResponse<T> = {
  statusCode: number;
  data: T;
  message: string;
};
export type AddFavouriteResponse = {
  statusCode: number;
  message: string;
};
export type AddFavouriteRequest = {
  photo: string;
  deleted: boolean;
};
export type MammaResponse = [
  {
    id: string;
    deleted: boolean;
    originalUrl: string;
    thumbnailUrl: string;
    author: string;
    description: string;
    public: boolean;
    user: string;
  },
];
export interface FormDataValue {
  append(user: string, author: string, uploaded_file: any): void;
}
export type UploadPhotoResponse = {
  id: string;
  thumbnailUrl: string;
  originalUrl: string;
};
export type FavouritePhotoResponse = [
  {
    id: string;
    deleted: boolean;
    user: { id: string };
    photo: {
      id: string;
      deleted: boolean;
      originalUrl: string;
      thumbnailUrl: string;
      author: string;
      public: boolean;
      user: {
        id: string;
      };
      description: string | null;
    };
  },
];
export type PostApiResponse = [
  {
    id: string;
    createdAt: string;
    updatedAt: string;
    deleted: boolean;
    content: string;
    scheduledAt: any;
    user: string;
  },
];
export type RelatedPostApiResponse = [
  {
    id: string;
    userId: string;
    name: string;
    imageUrl: string;
    twitterHandle: string;
    text: string;
    views: string;
    retweets: string;
    replayCount: string;
    topicName: { id: string; name?: string };
    likes: string;
    createdAt: string;
    updatedAt: string;
    deleted: boolean;
    redirectURL: string;
  },
];
export type TopicApiResponse = [
  {
    createdAt: string;
    deleted: boolean;
    id: string;
    name: string;
    updatedAt: string;
    user: string;
  },
];

export type ApiResponse<T> = {
  data: T;
  message: string;
  statusCode: number;
};
export type GetResponse<T> = {
  data: T;
  message: string;
  statusCode: number;
  totalPages: number;
};

export interface PostValue {
  user: any;
  content: any;
}
export interface TopPost {
  page: number;
  token: string;
  hour: string | number;
  //   topic_id: string;
}

export interface TopicValue {
  name: string;
}
export interface postId {
  id: string;
}
export interface UpdatedData {
  id: string;

  content: any;
  scheduledAt: any;
}
export interface getData {
  userId: string;
  currentPage: number;
}
export interface formatResponse {
  format: boolean;
}
export interface UpdatedTopicData {
  id: string;
  name: string;
}

export interface AddProfilePicResponse {
  statusCode: number;
  message: string;
  profilePicture: string;
  //   data: {
  //     userData: User;
  //     configData: Config;
  //   };
}

export interface ProfileData {
  append(user: string, profile_pic: any): void;
}

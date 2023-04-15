import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useUpdateConfigMutation } from "@/app/modules/auth/slices/authApiSlice";
import { updateConfigNoLogin, updateUser } from "@/app/modules/auth/slices/authSlice";
import React, { useContext } from "react";
import { useEffect, useRef, useState } from "react";
import { FaCheck, FaUserCircle } from "react-icons/fa";
export const HistoryAndPreset: any = (props: any) => {
  const initialData = [
    {
      id: "1",
      colorCode: "#F9ECE6",
      colorName: "pale",
    },
    {
      id: "2",
      colorCode: "#F0D3C5",
      colorName: "fair",
    },
    {
      id: "3",
      colorCode: "#E3B38D",
      colorName: "medium",
    },
    {
      id: "4",
      colorCode: "#BC8D57",
      colorName: "olive",
    },
    {
      id: "5",
      colorCode: "#A96C4F",
      colorName: "brown",
    },
    {
      id: "6",
      colorCode: "#704733",
      colorName: "black",
    },
  ];
  const dispatch = useAppDispatch();
  const [addUpdateConfig] = useUpdateConfigMutation();
  const { configData } = useAppSelector((state) => {
    return state.auth;
  });
  const { token } = useAppSelector((state) => state.auth);
  const [presets, setPresets] = useState<any[]>(configData?.presetColor);
  // const [selectedColor, setSelectedColor] = useState<any>(configData.selectedColor);
  const handleSelection = async (obj: any) => {
    if (!token) {
      let newObj = {
        presetColor: [
          {
            id: 1,
            colorCode: "#F0D3C5",
            colorName: "fair",
            hsv: ["20°, 18%, 94%"],
          },
          {
            id: 2,
            colorCode: "#E3B38D",
            colorName: "medium",
            hsv: ["27°, 38%, 89%"],
          },
          {
            id: 3,
            colorCode: "#A96C4F",
            colorName: "brown",
            hsv: ["19°, 53%, 66%"],
          },
          {
            id: 4,
            colorCode: "#704733",
            colorName: "black",
            hsv: ["20°, 54%, 44%"],
          },
        ],
        selectedColor: obj,
        history: [],
      };

      chrome.storage.local.set({ configData: newObj }).then(() => {
        // console.log("");
      });
      dispatch(updateConfigNoLogin(newObj));
    }

    await addUpdateConfig(obj)
      .unwrap()
      .then((res: any) => {
        // console.log("");
      });
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-black font-semibold text-sm capitalize border-b border-gray-600 pb-1">
          history
        </p>
        <div
          className={
            (token && configData?.history.length ? "block " : "hidden ") +
            "h-[100px] overflow-y-auto overflow-x-hidden"
          }
        >
          <div className="flex items-center gap-3 flex-wrap w-[27em]">
            {configData?.history.map((color, i) => {
              function hsvToHex(h: number, s: number, v: number) {
                let rgb = hsvToRgb(h, s, v);
                let r = Math.round(rgb.r * 255)
                  .toString(16)
                  .padStart(2, "0");
                let g = Math.round(rgb.g * 255)
                  .toString(16)
                  .padStart(2, "0");
                let b = Math.round(rgb.b * 255)
                  .toString(16)
                  .padStart(2, "0");
                return "#" + r + g + b;
              }

              function hsvToRgb(h: number, s: number, v: number) {
                let c = v * s;
                let x = c * (1 - Math.abs(((h * 6) % 2) - 1));
                let m = v - c;
                let r, g, b;
                if (h < 1 / 6) {
                  r = c;
                  g = x;
                  b = 0;
                } else if (h < 2 / 6) {
                  r = x;
                  g = c;
                  b = 0;
                } else if (h < 3 / 6) {
                  r = 0;
                  g = c;
                  b = x;
                } else if (h < 4 / 6) {
                  r = 0;
                  g = x;
                  b = c;
                } else if (h < 5 / 6) {
                  r = x;
                  g = 0;
                  b = c;
                } else {
                  r = c;
                  g = 0;
                  b = x;
                }
                return {
                  r: r + m,
                  g: g + m,
                  b: b + m,
                };
              }

              function parseHsvString(hsvString: string) {
                let regex = /(\d+)°,\s*(\d+)%,\s*(\d+)%/;
                let match = hsvString?.match(regex);
                if (match) {
                  let h = parseInt(match[1]) / 360;
                  let s = parseInt(match[2]) / 100;
                  let v = parseInt(match[3]) / 100;
                  return { h, s, v };
                } else {
                  throw new Error("Invalid HSV string");
                }
              }

              let hsvColor = parseHsvString(color.hsv[0]);
              let hexColor = hsvToHex(hsvColor.h, hsvColor.s, hsvColor.v);

              return (
                <div
                  className="flex flex-col items-center gap-2 mt-2 cursor-pointer"
                  key={i}
                  onClick={() => handleSelection(color)}
                  role="presentation"
                >
                  {configData?.selectedColor?.id == color.id ? (
                    <div className="flex flex-col items-center gap-2 mt-2 cursor-pointer">
                      <div className="color-selected p-1 rounded-full relative">
                        <div
                          className={`w-8 h-8 color-shadow rounded-full`}
                          style={{ background: hexColor }}
                        />

                        <FaCheck className="text-[#8b0000] text-sm absolute top-[14px] left-[13px]"></FaCheck>
                      </div>
                      <p
                        className="text-black text-xs capitalize truncate w-[60px]"
                        title={color?.imageName}
                      >
                        {color?.imageName}
                      </p>
                    </div>
                  ) : (
                    <>
                      <div
                        className={`w-8 h-8 color-shadow rounded-full`}
                        style={{ background: hexColor }}
                      />
                      <p
                        className="text-black relative top-[12px] text-xs capitalize truncate w-[60px]"
                        title={color?.imageName}
                      >
                        {color?.imageName}
                      </p>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {!token && (
        <p className="text-black text-sm pb-1 my-3 ">
          Sign up to see your uploaded skin tones.
        </p>
      )}
      <div>
        <p className="text-black text-sm font-semibold border-b border-gray-600 pb-1">
          presets
        </p>
        <div className="flex items-center gap-3">
          {presets?.map((preset: any) => (
            <div
              key={preset.id}
              className="flex flex-col items-center gap-3 w-[5em] mt-2 cursor-pointer"
              onClick={() => handleSelection(preset)}
              aria-hidden="true"
            >
              {configData?.selectedColor?.id === preset.id ? (
                <>
                  <div className="flex flex-col items-center gap-2 cursor-pointer">
                    <div className="color-selected p-1 rounded-full relative">
                      <div
                        className={`w-8 h-8 color-shadow rounded-full`}
                        style={{ background: `${preset.colorCode}` }}
                      />

                      <FaCheck className="text-[#8b0000] text-sm absolute top-[14px] left-[13px]"></FaCheck>
                    </div>
                    <p className="text-black text-xs capitalize">{preset.colorName}</p>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className={`w-8 h-8 color-shadow rounded-full`}
                    style={{ background: `${preset.colorCode}` }}
                  />
                  <p className="text-black relative top-[7px] text-xs capitalize">
                    {preset.colorName}
                  </p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

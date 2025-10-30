import React from "react";

const FoundryDemo = () => {
  return (
    <div>
      <div
        data-breakp="desktop"
        data-dl-mode="off"
        className="self-stretch h-[960px] px-[595px] py-72 inline-flex flex-col justify-start items-start gap-2 overflow-hidden"
      >
        <div className="self-stretch flex flex-col justify-start items-center">
          <div className="pb-5 flex flex-col justify-start items-start gap-2">
            <div
              data-breakpoint="tablet"
              data-dl-mode="off"
              data-set="02"
              className="px-4 py-1 bg-opacity-hex-16 rounded-full outline outline-offset-[-1px] outline-opacity-hex-08 inline-flex justify-start items-start overflow-hidden"
            >
              <div className="justify-start text-surface-on-primary text-[10px] font-normal font-['PP_Right_Grotesk_Mono'] leading-3">
                Variable Font
              </div>
            </div>
          </div>
          <div className="self-stretch pb-16 flex flex-col justify-start items-center gap-2">
            <div className="self-stretch text-center justify-start text-surface-on-primary text-8xl font-semibold font-['TG_Malromur'] leading-[96px]">
              Málrómur
            </div>
            <div className="self-stretch justify-start text-surface-on-primary text-xl font-semibold font-['TG_Malromur'] leading-5">
              A contemporary italic variable font for editorial design
            </div>
          </div>
          <div className="self-stretch px-20 inline-flex justify-start items-start gap-5">
            <div
              data-breakpoint="mobile"
              data-type="primary"
              className="flex-1 self-stretch px-6 py-3 bg-surface-support-split-inverse rounded-3xl outline outline-offset-[-1px] outline-opacity-hex-inverse-08 flex justify-center items-center gap-2 overflow-hidden"
            >
              <div
                data-property-1="mobile"
                data-show-left="false"
                data-show-right="false"
                data-show-sentencecase="true"
                data-show-uppercase="false"
                className="rounded-full flex justify-center items-center gap-2 overflow-hidden"
              >
                <div className="justify-start text-surface-primary text-xs font-normal font-['PP_Right_Grotesk_Mono'] leading-3 tracking-tight">
                  Download font
                </div>
              </div>
            </div>
            <div
              data-breakpoint="desktop"
              data-type="secondary"
              className="flex-1 self-stretch bg-opacity-hex-04 rounded-full flex justify-center items-center overflow-hidden"
            >
              <div
                data-property-1="desktop"
                data-show-left="false"
                data-show-right="false"
                data-show-sentencecase="true"
                data-show-uppercase="false"
                className="px-7 py-3 rounded-full flex justify-center items-center gap-2 overflow-hidden"
              >
                <div className="justify-start text-surface-on-secondary text-xs font-normal font-['PP_Right_Grotesk_Mono'] leading-3 tracking-tight">
                  View Specimen
                </div>
              </div>
            </div>
          </div>
          <div className="pt-4 flex flex-col justify-start items-start gap-2">
            <div className="justify-start text-opacity-hex-64 text-[10px] font-normal font-['PP_Right_Grotesk_Mono'] leading-[10px]">
              Free for personal and commercial use
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoundryDemo;

/* 
    File: SpecialInfo.tsx
    Version: 1.0.0
    Developer: Danny Nothdurft  
    Description:
*/

import React, { FC, useState, useEffect, useRef } from "react";
import countTotalSI from "@/utils/countTotalSI";

interface SpecialInfoProps {
  coll: string;
  text: string;
}

const SpecialInfo: FC<SpecialInfoProps> = ({ coll, text }) => {
  const [totalCount, setTotalCount] = useState<number | null>(0);
  const [animatedCount, setAnimatedCount] = useState<number>(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchTotalCount = async () => {
      try {
        const count = await countTotalSI(coll);
        setTotalCount(count ?? 0);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTotalCount();
  }, [coll]);

  useEffect(() => {
    const animateCount = () => {
      if (ref.current) {
        const observer = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting) {
              const start = 0;
              const end = totalCount || 0;
              const duration = 200;
              const stepTime = 50;
              const totalSteps = duration / stepTime;
              const stepValue = (end - start) / totalSteps;

              let currentStep = 0;
              const incrementCount = () => {
                if (currentStep <= totalSteps) {
                  setAnimatedCount(Math.round(start + stepValue * currentStep));
                  currentStep++;
                  requestAnimationFrame(incrementCount);
                } else {
                  setAnimatedCount(end);
                }
              };

              incrementCount();
              observer.disconnect();
            }
          },
          { threshold: 0.6 }
        );

        if (ref.current) {
          observer.observe(ref.current);
        }
      }
    };

    animateCount();
  }, [totalCount]);

  return (
    <p className="info-item" ref={ref}>
      {totalCount}
      <span>{text}</span>
    </p>
  );
};

export default SpecialInfo;

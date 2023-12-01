import classes from "./ShowScore.module.css";
import CircularChart from "./CircularChart";
import { useEffect, useState } from "react";
import SectionScore from "./SectionScore";
import ShowWrongQuestion from "./ShowWrongQuestion";
import { error } from "../App";
import { ShowCategory } from "./ShowCategory";

interface ShowScoreProps {
  score: number;
  sectionOneErrors: error[];
  sectionTwoErrors: error[];
  sectionThreeErrors: error[];
}

interface dataItem {
  totalQuestions: number;
  maxErrorsAllowed: number;
}

interface category {
  categoryID: number;
  categoryName: string;
  total: number;
}

export default function ShowScore(props: ShowScoreProps) {
  const percentage = Math.round((props.score / 9) * 100);
  const msg = percentage > 60 ? "Congratulations!" : "Unfortunately";
  const subMmsg =
    percentage > 60 ? "You passed the exam" : "You failed the exam";
  const color = percentage > 60 ? `rgb(67, 100, 46)` : `rgb(255,100,100)`;

  const sectionOneError =
    props.sectionOneErrors[
      Math.floor(Math.random() * props.sectionOneErrors.length)
    ];
  const sectionTwoError =
    props.sectionTwoErrors[
      Math.floor(Math.random() * props.sectionTwoErrors.length)
    ];
  const sectionThreeError =
    props.sectionThreeErrors[
      Math.floor(Math.random() * props.sectionThreeErrors.length)
    ];

  const totalWrong =
    props.sectionOneErrors.length +
    props.sectionTwoErrors.length +
    props.sectionThreeErrors.length;

  const [data, setData] = useState<dataItem[]>([]);
  const [categories, setCategories] = useState<category[]>([]);
  const [totalWrongCategory, setTotalWrongCategory] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchMetaData = async () => {
    try {
      const response = await fetch("/questions/metadata.json");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchCategory = async () => {
    try {
      const response = await fetch("/questions/categories.json");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const jsonData = await response.json();
      setCategories(jsonData);
      setTotalWrongCategory(Array(jsonData.length).fill(0));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const incrementTotalWrongCategoryAtIndex = (index: number) => {
    setTotalWrongCategory((prevState) => {
      const updatedArray = [...prevState];
      updatedArray[index] = (prevState[index] || 0) + 1; // Increment the value
      return updatedArray;
    });
  };

  const calcCategoryFromSection = (errorList: error[]) => {
    for (let i = 0; i < errorList.length; i++) {
      incrementTotalWrongCategoryAtIndex(errorList[i].categoryID - 1);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([fetchMetaData(), fetchCategory()]);
        const allErrors = [
          ...props.sectionOneErrors,
          ...props.sectionTwoErrors,
          ...props.sectionThreeErrors,
        ];
        calcCategoryFromSection(allErrors);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  if (loading) return <div>Loading...</div>;

  const getSectionErrorCount = (sectionIndex: number) => {
    switch (sectionIndex) {
      case 0:
        return props.sectionOneErrors.length;
      case 1:
        return props.sectionTwoErrors.length;
      case 2:
        return props.sectionThreeErrors.length;
      default:
        return 0;
    }
  };

  return (
    <div className={classes.outerBox}>
      <div className={classes.subHeading}>Free practice Exam</div>
      <div className={classes.container}>
        <div className={classes.subHeading2}> Your Result </div>

        {/* Total result */}
        <div className={classes.result}>
          <CircularChart percentage={percentage} />
          <div className={classes.score}>
            <div className={classes.msg} style={{ color: color }}>
              {msg}
            </div>
            <div className={classes.subMsg}>{subMmsg}</div>
          </div>
        </div>

        {/* Section wise result */}
        <div className={classes.sectionResult}>
          {data.map((section, index) => (
            <SectionScore
              key={index}
              index={index + 1}
              errNum={getSectionErrorCount(index)}
              total={section.totalQuestions}
              maxErrors={section.maxErrorsAllowed}
            />
          ))}
        </div>
        <div className={classes.subHeading2}>
          You got a total of {totalWrong} question(s) wrong
        </div>
        <div className={classes.wrongContainer}>
          <ShowWrongQuestion section={"one"} id={sectionOneError?.id} />
          <ShowWrongQuestion section={"two"} id={sectionTwoError?.id} />
          <ShowWrongQuestion section={"three"} id={sectionThreeError?.id} />
        </div>

        {/* Category wise result */}
        <div className={classes.subHeading2}>Category wise result</div>
        <div className={classes.catGrid}>
          <ShowCategory category = {categories[0]} total = {totalWrongCategory[0]} />
          <ShowCategory category = {categories[1]} total = {totalWrongCategory[1]} />
          <ShowCategory category = {categories[2]} total = {totalWrongCategory[2]} />

        </div>
      </div>
    </div>
  );
}

export interface ShowCategoryProps {
  category: category;
  total: number;
}



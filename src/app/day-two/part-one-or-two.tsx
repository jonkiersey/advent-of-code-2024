import ButtonsBox from "@components/buttons-box";
import ScrollBox from "@components/scroll-box";
import { Button, Typography } from "@mui/material";
import { useState } from "react";

type Props = {
  reports: number[][];
  useSafetyTolerance?: boolean;
};

const PartOneOrTwo = ({ reports, useSafetyTolerance }: Props) => {
  const [reportSafeties, setReportSafeties] = useState<boolean[]>([]);
  const [loadingReportSafeties, setLoadingReportSafeties] = useState(false);

  const safetyCheckReport = (report: number[]): boolean => {
    if (report.length < 2) {
      return true;
    }
    if (report[0] === report[1]) {
      return false;
    }
    const direction = report[0] < report[1] ? "up" : "down";
    for (let i = 1; i < report.length; i++) {
      if (direction === "up" && report[i] < report[i - 1]) {
        return false;
      }
      if (direction === "down" && report[i] > report[i - 1]) {
        return false;
      }
      const diff = Math.abs(report[i] - report[i - 1]);
      if (diff < 1 || diff > 3) {
        return false;
      }
    }
    return true;
  };

  const safetyCheckWithTolerance = (report: number[]): boolean => {
    if (safetyCheckReport(report)) {
      return true;
    }
    for (let i = 0; i < report.length; i++) {
      if (safetyCheckReport(report.toSpliced(i, 1))) {
        return true;
      }
    }
    return false;
  };

  const safetyCheckReports = () => {
    setLoadingReportSafeties(true);
    setReportSafeties(
      reports.map(
        useSafetyTolerance ? safetyCheckWithTolerance : safetyCheckReport
      )
    );
    setLoadingReportSafeties(false);
  };

  return (
    <>
      <ButtonsBox>
        <Button
          variant="contained"
          onClick={safetyCheckReports}
          disabled={loadingReportSafeties}
        >
          Safety Check {useSafetyTolerance ? "with Tolerance" : ""}
        </Button>
      </ButtonsBox>
      {reportSafeties.length > 0 && (
        <>
          <ScrollBox>
            {reportSafeties.map((safety, i) => (
              <Typography key={i}>
                Report {i + 1} {`(${reports[i].join(" ")})`} is{" "}
                {safety ? "safe" : "not safe"}
              </Typography>
            ))}
          </ScrollBox>
          <Typography>
            Safe Reports: {reportSafeties.filter(Boolean).length}
          </Typography>
        </>
      )}
    </>
  );
};

export default PartOneOrTwo;

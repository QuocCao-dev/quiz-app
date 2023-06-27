import { Request, RequestHandler } from "express";
import prisma from "../lib/prisma";

export const addReportHandler: RequestHandler = async (req: Request, res) => {
  try {
    const { examId } = req.body;
    const userId = res.locals.userId;

    const report = await prisma.report.create({
      data: {
        examId,
        userId,
      },
    });

    res.status(201).json({
      message: "Report created successfully",
      success: true,
      data: report,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getReportsHandler: RequestHandler = async (req: Request, res) => {
  try {
    const { examName, userName } = req.body;

    const reports = await prisma.report.findMany({
      where: {
        exam: {
          name: examName,
        },
        user: {
          name: userName,
        },
      },
      include: {
        exam: true,
        user: true,
      },
    });

    res.status(200).json({
      message: "Reports fetched successfully",
      success: true,
      data: reports,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

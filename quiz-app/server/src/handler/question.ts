import { Request, RequestHandler, Response } from "express";
import prisma from "../lib/prisma";

export const createQuestionHandler: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { examId, name, correctOption, options } = req.body;

    const exam = await prisma.exam.findUnique({
      where: { id: +examId },
    });

    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    const question = await prisma.question.create({
      data: {
        exam: { connect: { id: +examId } },
        name,
        correctOption,
        options,
      },
    });

    res.json({
      message: "Question created successfully",
      success: true,
      data: question,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const editQuestionHandler: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { id: questionId } = req.params;
    const { name, correctOption, options, examId } = req.body;

    const question = await prisma.question.findUnique({
      where: { id: +questionId },
    });

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    const updatedQuestion = await prisma.question.update({
      where: { id: +questionId },
      data: {
        name,
        correctOption,
        options,
        ...(examId && { exam: { connect: { id: +examId } } }),
      },
    });

    res.json({
      message: "Question updated successfully",
      success: true,
      data: updatedQuestion,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteQuestionHandler: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { id: questionId } = req.params;
    const question = await prisma.question.findUnique({
      where: { id: +questionId },
    });

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    await prisma.question.delete({
      where: { id: +questionId },
    });

    res.json({
      message: "Question deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

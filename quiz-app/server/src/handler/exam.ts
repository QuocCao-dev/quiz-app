import { Request, RequestHandler } from "express";
import { CreateExamSchemaBody, GetExamByIdSchemaParams } from "../schema/exam";
import prisma from "../lib/prisma";

export const createExamHandler: RequestHandler = async (
  req: Request<{}, {}, CreateExamSchemaBody>,
  res
) => {
  try {
    const { name, duration, category, totalMarks, passingMarks } = req.body;

    const examExists = await prisma.exam.findUnique({
      where: { name },
    });

    if (examExists) {
      return res.status(400).json({ message: "Exam already exists" });
    }

    const exam = await prisma.exam.create({
      data: {
        name,
        duration,
        category,
        totalMarks,
        passingMarks,
      },
    });

    res.json({
      message: "Exam created successfully",
      success: true,
      data: exam,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getExamsHandler: RequestHandler = async (req: Request, res) => {
  try {
    const exams = await prisma.exam.findMany();

    res.json({
      message: "Exams fetched successfully",
      success: true,
      data: exams,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getExamByIdHandler: RequestHandler<
  GetExamByIdSchemaParams
> = async (req: Request, res) => {
  try {
    const { id } = req.params;

    const exam = await prisma.exam.findUnique({
      where: { id: +id },
      include: {
        questions: {
          select: {
            id: true,
            name: true,
            options: true,
          },
        },
      },
    });

    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    res.json({
      message: "Exam fetched successfully",
      success: true,
      data: exam,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateExamByIdHandler: RequestHandler = async (
  req: Request,
  res
) => {
  try {
    const { id: examId } = req.params;

    const exam = await prisma.exam.findUnique({
      where: { id: +examId },
    });

    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    const updatedExam = await prisma.exam.update({
      where: { id: +examId },
      data: {
        ...req.body,
      },
    });

    res.json({
      message: "Exam updated successfully",
      success: true,
      data: updatedExam,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteExamByIdHandler: RequestHandler = async (
  req: Request,
  res
) => {
  try {
    const { id: examId } = req.params;

    const exam = await prisma.exam.findUnique({
      where: { id: +examId },
    });

    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    await prisma.exam.delete({
      where: { id: +examId },
    });

    res.json({
      message: "Exam deleted successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

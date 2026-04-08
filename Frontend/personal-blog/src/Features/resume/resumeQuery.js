import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchResume,
  createResume,
  updateResume,
  updateResumeSection,
  updatePdfLink,
} from "./resumeAPI.js";

export const UseFetchResume = () => {
  return useQuery({
    queryKey: ["resume"],
    queryFn: fetchResume,
    retry: false,
  });
};

export const UseCreateResume = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createResume,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["resume"] }),
  });
};

export const UseUpdateResume = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateResume,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["resume"] }),
  });
};

export const UseUpdateResumeSection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateResumeSection,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["resume"] }),
  });
};

export const UseUpdatePdfLink = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePdfLink,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["resume"] }),
  });
};

import { useState, useEffect } from 'react';
import { useTeamStore } from '../../stores/team-store';
import { usePromptTemplate, useUpdatePromptTemplate, useRevertPromptTemplate } from '../../hooks/use-config';
import { PromptTemplate } from '../../types';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { Loader2, FileText } from 'lucide-react';

import { PromptList } from '../../components/prompts/prompt-list';
import { PromptEditor } from '../../components/prompts/prompt-editor';

export function PromptsPage() {
  const { activeTeam } = useTeamStore();
  const [selectedPromptName, setSelectedPromptName] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState<string>('');
  const [hasChanges, setHasChanges] = useState(false);

  const PROMPT_NAMES = [
    'doc_creator_system',
    'doc_creator_user',
    'fetch_example_system',
    'fetch_example_user',
    'default_analyzer_system',
    'c_sharp_analyzer_system',
    'java_analyzer_system',
    'file_analyzer_user',
  ];

  const { data: promptData, isLoading } = usePromptTemplate(activeTeam?.id, selectedPromptName || undefined);
  const updateMutation = useUpdatePromptTemplate(activeTeam?.id || '');
  const revertMutation = useRevertPromptTemplate(activeTeam?.id || '');

  useEffect(() => {
    if (promptData) {
      setEditedContent(promptData.content);
      setHasChanges(false);
    }
  }, [promptData]);

  if (!activeTeam) {
    return (
      <div className="p-6">
        <Alert>
          <AlertDescription>Please select a team to view prompt templates</AlertDescription>
        </Alert>
      </div>
    );
  }

  const handleSelectPrompt = (name: string) => {
    if (hasChanges) {
      if (!window.confirm('You have unsaved changes. Do you want to discard them?')) return;
    }
    setSelectedPromptName(name);
  };

  const handleContentChange = (value: string) => {
    setEditedContent(value);
    setHasChanges(value !== promptData?.content);
  };

  const handleSave = () => {
    if (selectedPromptName) {
      updateMutation.mutate({
        name: selectedPromptName,
        content: editedContent,
      }, {
        onSuccess: () => {
          setHasChanges(false);
        }
      });
    }
  };

  const handleRevert = () => {
    if (selectedPromptName) {
      revertMutation.mutate(selectedPromptName);
    }
  };

  return (
    <div className="flex h-full">
      <PromptList 
        promptNames={PROMPT_NAMES}
        selectedPromptName={selectedPromptName}
        onSelectPrompt={handleSelectPrompt}
      />

      <div className="flex-1 flex flex-col">
        {selectedPromptName ? (
          isLoading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <PromptEditor 
              selectedPromptName={selectedPromptName}
              promptData={promptData}
              editedContent={editedContent}
              hasChanges={hasChanges}
              onContentChange={handleContentChange}
              onSave={handleSave}
              onRevert={handleRevert}
              isUpdating={updateMutation.isPending}
              isReverting={revertMutation.isPending}
            />
          )
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No Template Selected</h3>
              <p className="text-sm text-muted-foreground">
                Select a prompt template from the sidebar to view and edit
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
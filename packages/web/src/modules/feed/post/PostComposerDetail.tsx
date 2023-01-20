import { Card, Flex, Input, TextArea, Button, SelectInput } from '@violetit/ui';

export const PostComposerDetail = () => {
  return (
    <div className="m-2">
      <SelectInput
        initial="u/me"
        options={['r/programmingLanguages', 'r/linux']}
        className="sm:w-min"
      />
      <Card className="px-4 py-4">
        <Flex className="flex-col w-full gap-4">
          <Input placeholder="Title" />
          <TextArea />
          <Button className="w-min ml-auto rounded-full py-2">Post</Button>
        </Flex>
      </Card>
    </div>
  );
};

import { Box, Flex, Text } from "@radix-ui/themes";

interface LoadingProps {
  message: string
}
const Loading = ({message}: LoadingProps) => {
	return (
		<Flex gap="3" align="center" justify="center">
			<Box style={{ width: "2rem", height: "2rem" }}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					className="Spinner"
				>
					<path
						fill="currentColor"
						d="M6.577 11.92a1.62 1.62 0 0 0 1.521 1.706h.094a1.617 1.617 0 1 0-1.615-1.706ZM.55 11.504a.522.522 0 1 0 .002 0H.551ZM6.474 2.54a.522.522 0 1 0-.001 0h.001Zm1.64 2.858a.807.807 0 1 0-.727-1.44a.807.807 0 0 0 .727 1.44ZM2.597 7.364a.665.665 0 1 0 .729-1.112a.665.665 0 0 0-.729 1.112Zm.982 3.852a.808.808 0 1 0 .76.852a.808.808 0 0 0-.76-.852Zm-.891 5.422a.665.665 0 1 0 .893.295a.664.664 0 0 0-.891-.296l-.002.001Zm3.136-7.093a.95.95 0 1 0-.001 0Zm9.95-4.21a.808.808 0 1 0 0-.001Zm1.656-2.85a.522.522 0 1 0 0-.001Zm-1.53 7.893a1.616 1.616 0 1 0-.183 3.227h.093a1.616 1.616 0 0 0 .09-3.23v.003Zm-7.255-.945a1.616 1.616 0 1 0 2.887-1.454A1.616 1.616 0 0 0 8.645 9.43v.002Zm12.667-2.07a.665.665 0 1 0-.003 0h.003Zm-4.096.514a.95.95 0 1 0 .856 1.696a.95.95 0 0 0-.856-1.696Zm-5.277-5.636a.665.665 0 1 0-.004 0h.004Zm-.008 4.183a.95.95 0 1 0-.001 0h.001Zm-5.147 9.7a.95.95 0 1 0-.854-1.697a.95.95 0 0 0 .854 1.697Zm5.76-8.313a1.614 1.614 0 1 0 2.701 1.767a1.614 1.614 0 0 0-2.701-1.767Zm2.81 6.757a1.617 1.617 0 1 0-.716 2.17h.001a1.607 1.607 0 0 0 .724-2.155l-.008-.015Zm2.822-.112a.95.95 0 1 0-1.042 1.588a.95.95 0 0 0 1.042-1.588Zm3.096-2.429a.808.808 0 1 0-.852.76a.808.808 0 0 0 .852-.76Zm2.235-.574a.522.522 0 1 0-.058 1.043a.522.522 0 0 0 .058-1.043Zm-2.104 5.182a.665.665 0 1 0-.73 1.113a.665.665 0 0 0 .73-1.112ZM6.57 21.517a.522.522 0 1 0-.574.873a.522.522 0 0 0 .573-.873Zm10.955-.055a.522.522 0 1 0 .003-.001l-.003.001Zm-6.07-5.272a1.616 1.616 0 1 0-2.702-1.771a1.616 1.616 0 0 0 2.703 1.771Zm-3.23 2.477a.808.808 0 1 0-.885 1.35a.808.808 0 0 0 .886-1.35Zm3.767 3.093a.665.665 0 1 0 .003 0h-.003ZM12 17.576a.95.95 0 1 0 .001 0Zm3.886 1.026a.808.808 0 1 0 .004-.002c-.001 0-.003 0-.004.002Z"
					></path>
				</svg>
			</Box>

			<Text>{message} ...</Text>
		</Flex>
	);
};

export default Loading;

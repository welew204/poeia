'use server'

const frankFurterId = "1aea7045-8358-4e94-a846-14c276010669"

const createElement = async (formData: FormData) => {
    try {
        console.log(formData)
        return { success: true, error: null };
    } catch (error) {
        console.error(error);
        return { success: false, error: error as Error };
    }
  }

export { createElement }
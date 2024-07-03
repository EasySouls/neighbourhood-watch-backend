import { SetMetadata } from '@nestjs/common';
import { PolicyHandler } from './policyHandler';

export const CHECK_POLICIES_KEY = 'casl:check-policies';
export const CheckPolicies = (...handlers: PolicyHandler[]) => SetMetadata(CHECK_POLICIES_KEY, handlers);
